from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from PIL import Image
import time
driver = webdriver.Chrome()
# driver.set_window_size(1400, 900)
print driver.get_window_size()

# Google Login
driver.get("https://developers.facebook.com/")
test = driver.find_element_by_class_name("_p46")
print test
driver.find_element_by_class_name("_p46").send_keys(Keys.RETURN)
time.sleep(1)
driver.find_element_by_id("email").send_keys("motoslugger@gmail.com")
time.sleep(1)
driver.find_element_by_id("pass").send_keys("101493jwh")
driver.find_element_by_id("loginbutton").send_keys(Keys.RETURN)
time.sleep(1)
driver.find_element_by_xpath('//*[@href="/apps/"]').click()
time.sleep(1)
driver.find_element_by_xpath('//*[@href="/apps/1640288612910911/"]').click()
# Now at App Page!
print driver.current_url
driver.get("https://developers.facebook.com/apps/1640288612910911/settings/advanced/")
time.sleep(1)
driver.find_element_by_xpath('//button[text()="Ads API"]').click()
time.sleep(2)
inputBox = driver.find_element_by_xpath('//*[@placeholder="Account ID"]')
print inputBox
# *** Adding Accounts Correctly - 
# TODO: Need to loop through active and valid accounts -
inputBox.send_keys('1545103032482058')
driver.find_element_by_xpath('//button[text()="Add"]').click()
# driver.find_element_by_class_name('_58al').send_keys('10153181724836957')
time.sleep(5)


driver.quit()