from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from PIL import Image
import time
driver = webdriver.Chrome()
driver.set_window_size(1400, 900)
print driver.get_window_size()

# Google Login
driver.get("https://accounts.google.com/o/oauth2/auth?access_type=offline&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fanalytics.readonly&response_type=code&client_id=376957746053-ugavtp8a0pmru0dabhn5vnrt1jovi2n1.apps.googleusercontent.com&redirect_uri=http%3A%2F%2Flocalhost%3A5000")
driver.find_element_by_id("Email").send_keys("analytics@foxtailmarketing.com")
driver.find_element_by_id("next").send_keys(Keys.RETURN)
time.sleep(1)
driver.find_element_by_id("Passwd").send_keys("q1w3e5r7t9")
driver.find_element_by_id("signIn").send_keys(Keys.RETURN)
time.sleep(3)
driver.find_element_by_id("submit_approve_access").send_keys(Keys.RETURN)
# End Google Login

print driver.current_url

# Function Definition
def getGA(num):
	"Nav-ing through page to get GA Info"
	print 'inside getGA'
	time.sleep(1)
	selector = ".sidebar-nav>li:nth-child(" + num + ")"
	# Clicking on client
	li = driver.find_element_by_css_selector(selector)
	li.click()
	time.sleep(3)
	driver.save_screenshot('./img/0-dataView-' + num + '.png')

	# Clicking on Google Analytics Bar
	ga = driver.find_element_by_id("ga")
	ga.click()
	time.sleep(.5)
	driver.save_screenshot('./img/1-ga-' + num + '.png')
	time.sleep(2)

	# Clicking on Paid Promotion Tab
	gaPaid = driver.find_element_by_id("paid-tab")
	gaPaid.click()
	time.sleep(.5)
	# Scrolling Down Page
	driver.execute_script("window.scrollTo(0, 450)")
	driver.save_screenshot('./img/2-gaPaid-' + num + '.png')
	return

# When I try to loop through the parameters I get a 'NameError: name 'getGa' is not defined'
clients = ['2','3','4','5']
for client in clients:
	print 'looping'
	getGa(client)

# This function Call Works
# getGA('2')
	
time.sleep(2)

driver.quit()