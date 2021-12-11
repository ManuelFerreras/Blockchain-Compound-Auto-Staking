import pyautogui

while True:
    posAccept = pyautogui.locateOnScreen('C:/Users/manue/Desktop/Blockchain-Compound-Auto-Staking/python/confirm.png')
    if posAccept != None:
        pyautogui.click(posAccept[0]+10, posAccept[1]+10)

    posEst = pyautogui.locateOnScreen('C:/Users/manue/Desktop/Blockchain-Compound-Auto-Staking/python/estimated.png')
    if posEst != None:
        pyautogui.click(posEst[0], posEst[1])
        pyautogui.press('pageend')
        pyautogui.click(posEst[0], posEst[1])
    
    
# pip install pyautogui