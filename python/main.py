import pyautogui

while True:
    posEst = pyautogui.locateOnScreen('estimated.png')
    if posEst != None:
        pyautogui.click(posEst[0], posEst[1])
        pyautogui.press('end')
    
    posAccept = pyautogui.locateOnScreen('confirm.png')
    if posAccept != None:
        pyautogui.click(posAccept[0]+10, posAccept[1]+10)

# pip install pyautogui