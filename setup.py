import os
import winreg
import tkinter
import tkinter.messagebox
import tkinter.filedialog

WALLPAPER_PATH = ""

####READ WALLPAPER PATH FROM USER INPUT###

app = tkinter.Tk()  # create CTk window like you do with the Tk window
app.geometry("400x240")

def button_function():
    global WALLPAPER_PATH
    dir = tkinter.filedialog.askdirectory()
    answer = tkinter.messagebox.askyesno(title="Setup", message="You want to continue with this path: %s" % dir)
    
    if (answer):
        WALLPAPER_PATH = dir
        app.quit()
    else:
        button_function()

# Use CTkButton instead of tkinter Button
label = tkinter.Label(master=app, text="Wallpaper Grabber Setup", font=("Arial", 25))
label.place(relx=0.5, rely=0.25, anchor=tkinter.CENTER)
button = tkinter.Button(master=app, text="Choose wallpaper folder (myprojects)", command=button_function)
button.place(relx=0.5, rely=0.5, anchor=tkinter.CENTER)


app.mainloop()

###CREATE ENVIRONMENT VARIABLE###

# Open the "Environment" key in the Windows Registry
key = winreg.OpenKey(winreg.HKEY_CURRENT_USER, "Environment", 0, winreg.KEY_ALL_ACCESS)
# Set the value of a new or existing environment variable
winreg.SetValueEx(key, "WALLPAPER_PATH", 0, winreg.REG_SZ, WALLPAPER_PATH)
# Close the Registry key
winreg.CloseKey(key)


###CREATE REG FILE###
path = str(os.getcwd().replace('\\', '\\\\') + "\\\\wpgrabber.exe\\")

file = f'''Windows Registry Editor Version 5.00
[HKEY_CLASSES_ROOT\wpgrabber]
@="Description here"
"URL Protocol"=""

[HKEY_CLASSES_ROOT\wpgrabber\shell]

[HKEY_CLASSES_ROOT\wpgrabber\shell\open]

[HKEY_CLASSES_ROOT\wpgrabber\shell\open\command]
@="\\"{path}" \\"%1\\""'''


with open("wpgrabber.reg", 'w') as f:
    f.write(file)