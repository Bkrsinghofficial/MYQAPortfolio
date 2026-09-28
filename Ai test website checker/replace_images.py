import re
import os

html_path = 'd:/Projects/Project3_Portfolio/index.html'
with open(html_path, 'r', encoding='utf-8') as f:
    content = f.read()

images_dir = 'stitch_markdown_website_builder (1)/HDDiagram'
images = {
    'Strategy: Managing STLC in Jira': 'JIRAandExecutionstrategy.png',
    'Core Flow Testing and STLC Management in Mobile': 'TestingLifecycleofjiraInMobile.png',
    'Multi-Tier E2E BDD Automation Framework': 'API_UI_E2EBDD.png',
    'Cloud Native Automation Framework': 'CloudNativeAutomation.png',
    'Comprehensive UI Automation Testing for DPOM': 'Testcafeuiautomation.png',
    'Data Validation Architecture: Azure and ETL': 'DATAValidationArchitecture.png',
    'Mobile API Debugging Strategy': 'MobileApiDebuggingStrategy.png',
    'Mobile Crash Log Analysis Strategy': 'MobileCrashLOGAnalysisStrategy.png',
    'Multi-Device Cloud Testing Strategy': 'MobileAutomation.png'
}

for alt, filename in images.items():
    # regex to find the img tag with this alt and replace its src
    # Note: img tag might have class or src in different orders, so use regex
    pattern = r'(<img[^>]*?alt="' + re.escape(alt) + r'"[^>]*?src=")[^"]*?(")'
    content = re.sub(pattern, r'\g<1>' + images_dir + '/' + filename + r'\g<2>', content)

with open(html_path, 'w', encoding='utf-8') as f:
    f.write(content)

print('Images replaced successfully')
