import pyautogui
import time

while True:
    posEst = pyautogui.locateOnScreen('python/estimated.png')
    if posEst != None:
        pyautogui.click(posEst[0], posEst[1])
        pyautogui.press('end')
        time.sleep(0.4)
        posAccept = pyautogui.locateOnScreen('python/accept.png')
        pyautogui.click(posAccept[0]+10, posAccept[1]+10)
        print("pressed")


# pip install pyautogui