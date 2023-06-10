from sys import argv, exit
import requests
from zipfile import ZipFile
import logging
import os
import time
import winreg

key = winreg.OpenKey(winreg.HKEY_CURRENT_USER, "Environment", 0, winreg.KEY_ALL_ACCESS)

WALLPAPER_PATH, _ = winreg.QueryValueEx(key, "WALLPAPER_PATH")

logging.basicConfig(level=logging.INFO)

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36"
}


def element_exists(soup):
    return bool(soup.find('a'))


def get_archive_url(url):
    api_url = "https://api.ggntw.com/steam.request"
    data = {
        "url":url
        }
    r = requests.post(api_url, json=data, headers=HEADERS)
    if (r.json().get("result") == 0):
        logging.error("Unable to download wallpaper")
        return None
    else:
        if ("bitshare.link" in str(r.json().get('url'))):
            get_archive_url(url)
        logging.info("Archive URL has been received: %s" % r.json().get('url'))
        return r.json().get('url')


def download_archive(url, path="file.zip"):
    r = requests.get(url)
    with open(path, 'wb') as f:
        f.write(r.content)
    logging.info("Archive has been downloaded")
    

def unzip(input_file, output_file=""):
    with ZipFile(input_file, 'r') as zip:
        zip.extractall(output_file)
    os.remove(input_file)
    logging.info("Archive has been extracted")


def main():
    if (len(argv) > 1):
        try:
            wallpaper_url = argv[1].split("wpgrabber://")[-1]

            archive_url = get_archive_url(wallpaper_url)
            download_archive(archive_url, WALLPAPER_PATH + "file.zip")
            unzip(WALLPAPER_PATH + "file.zip", WALLPAPER_PATH)
            print (f"Wallapper has been downloaded")
            time.sleep(3)
            exit(0)
        except Exception as e:
            print (e)
            time.sleep(3)
            exit(1)
if __name__ == '__main__':
    main()