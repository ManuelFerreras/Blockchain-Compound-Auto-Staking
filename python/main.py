import pyautogui

while True:
    posEst = pyautogui.locateOnScreen('C:/Users/GamerX/Downloads/Blockchain-Compound-Auto-Staking-main/Blockchain-Compound-Auto-Staking-main/python/estimated.png')
    if posEst != None:
        pyautogui.moveTo(400, 400)
        posAccept = pyautogui.locateOnScreen('C:/Users/GamerX/Downloads/Blockchain-Compound-Auto-Staking-main/Blockchain-Compound-Auto-Staking-main/python/confirm.png')
        if posAccept != None:
            pyautogui.click(posAccept[0]+10, posAccept[1]+10)

# pip install pyautogui