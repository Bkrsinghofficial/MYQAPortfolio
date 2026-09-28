import re
with open('d:/Projects/Project3_Portfolio/index.html', 'r', encoding='utf-8') as f:
    html = f.read()

articles = re.findall(r'<article class="([^"]*?)"', html)
print('Article classes:')
for a in articles:
    print(a)
