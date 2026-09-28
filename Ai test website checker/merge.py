import sys
import re

with open('d:/Projects/Project3_Portfolio/stitch_markdown_website_builder (1)/code.html', 'r', encoding='utf-8') as f:
    code_html = f.read()

with open('d:/Projects/Project3_Portfolio/index.html', 'r', encoding='utf-8') as f:
    index_html = f.read()

# Extract head content
head_match = re.search(r'<head>(.*?)</head>', code_html, re.DOTALL)
head_content = head_match.group(1) if head_match else ''
head_content = re.sub(r'<title>.*?</title>', '', head_content)
head_content = head_content.replace('<meta charset="utf-8">', '')
head_content = head_content.replace('<meta content="width=device-width, initial-scale=1.0" name="viewport">', '')

# Extract body attributes and content
body_match = re.search(r'<body(.*?)>(.*)</body>', code_html, re.DOTALL)
body_attrs = body_match.group(1) if body_match else ''
body_content = body_match.group(2) if body_match else ''

# Clean up body backgrounds
body_attrs = body_attrs.replace('bg-surface-container-lowest', 'bg-transparent')
body_content = body_content.replace('bg-surface-container-lowest', 'bg-transparent')
body_content = re.sub(r'bg-\[#070a12\]', 'bg-[#070a12]/30', body_content)
body_content = re.sub(r'bg-\[#0b1120\]', 'bg-[#0b1120]/30', body_content)

body_content = f'<div class="relative z-10">\n{body_content}\n</div>'

new_index_html = index_html
new_index_html = new_index_html.replace('</head>', f'{head_content}\n</head>')

new_index_html = re.sub(r'<body.*?>', f'<body{body_attrs}>', new_index_html)
new_index_html = new_index_html.replace('<script src="script.js?v=3"></script>', f'{body_content}\n  <script src="script.js?v=3"></script>')

with open('d:/Projects/Project3_Portfolio/index.html', 'w', encoding='utf-8') as f:
    f.write(new_index_html)

print('Merged successfully')
