import re
with open('d:/Projects/Project3_Portfolio/index.html', 'r', encoding='utf-8') as f:
    html = f.read()

img_srcs = re.findall(r'<img[^>]*?src=["\']([^"\']*)["\']', html)
for src in img_srcs:
    print(src)
