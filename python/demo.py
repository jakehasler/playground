from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from PIL import Image
import time
driver = webdriver.Chrome()
driver.set_window_size(1400, 900)
print driver.get_window_size()
driver.get("https://accounts.google.com/o/oauth2/auth?access_type=offline&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fanalytics.readonly&response_type=code&client_id=376957746053-ugavtp8a0pmru0dabhn5vnrt1jovi2n1.apps.googleusercontent.com&redirect_uri=http%3A%2F%2Flocalhost%3A5000")
driver.find_element_by_id("Email").send_keys("analytics@foxtailmarketing.com")
driver.find_element_by_id("next").send_keys(Keys.RETURN)
time.sleep(1)
driver.find_element_by_id("Passwd").send_keys("q1w3e5r7t9")
driver.find_element_by_id("signIn").send_keys(Keys.RETURN)
time.sleep(3)
driver.find_element_by_id("submit_approve_access").send_keys(Keys.RETURN)
print driver.current_url
time.sleep(1)
element = driver.find_element_by_id("main-content")
location = element.location
print 'location'
print location
size = element.size
print 'size'
print size
driver.save_screenshot('fa.png')
driver.quit()

im = Image.open('fa.png')

left = location['x']
top = location['y']
right = location['x'] + size['width']
bottom = location['y'] + 400
print left
print top
print right
print bottom

im = im.crop((left, top, right, bottom)) # defines crop points
im.save('screenshot.png') # saves new cropped image

# Xpath
# Reference things by class, ID, Or whatever. 
# Chrome 