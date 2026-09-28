import re
with open('d:/Projects/Project3_Portfolio/index.html', 'r', encoding='utf-8') as f:
    html = f.read()

img_tags = re.findall(r'<img[^>]*?alt=["\']([^"\']*)["\'][^>]*?src=["\'](http[^"\']*)["\']', html)
for alt, src in img_tags:
    print('Alt:', alt)
