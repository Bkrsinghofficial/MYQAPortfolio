import re
import os

html_path = 'd:/Projects/Project3_Portfolio/index.html'
with open(html_path, 'r', encoding='utf-8') as f:
    content = f.read()

images_dir = 'stitch_markdown_website_builder (1)/HDDiagram'
images = {
    'Azure DevOps Testing Strategy Complete STLC': 'AzureDevopsTestingstrategy.png',
    'Integrated Use of Generative AI Tools in Automation Testing': 'AIToolsUtilisation.png'
}

for alt, filename in images.items():
    pattern = r'(<img[^>]*?alt="' + re.escape(alt) + r'"[^>]*?src=")[^"]*?(")'
    content = re.sub(pattern, r'\g<1>' + images_dir + '/' + filename + r'\g<2>', content)

with open(html_path, 'w', encoding='utf-8') as f:
    f.write(content)

print('Images replaced successfully')
