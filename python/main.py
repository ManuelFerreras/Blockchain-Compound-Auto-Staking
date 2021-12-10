import pyautogui
import time

while True:
    posEst = pyautogui.locateOnScreen('estimated.png')
    if posEst != None:
        pyautogui.click(posEst[0], posEst[1])
        pyautogui.press('end')
        time.sleep(0.4)
        try:
            posAccept = pyautogui.locateOnScreen('confirm.png')
            pyautogui.click(posAccept[0]+10, posAccept[1]+10)
            print("pressed")
        except:
            pass

# pip install pyautogui