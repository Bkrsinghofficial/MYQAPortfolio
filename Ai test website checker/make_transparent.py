with open('d:/Projects/Project3_Portfolio/index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Make the article backgrounds transparent
html = html.replace('bg-gradient-to-b from-[#0b1120] to-[#070a12]', 'bg-gradient-to-b from-[#0b1120]/60 to-[#070a12]/60 backdrop-blur-md')

# There might also be a rounded-2xl bg-gradient-to-b from-[#0f172a] to-[#070a12] in the About section portrait
html = html.replace('bg-gradient-to-b from-[#0f172a] to-[#070a12]', 'bg-gradient-to-b from-[#0f172a]/60 to-[#070a12]/60 backdrop-blur-md')

with open('d:/Projects/Project3_Portfolio/index.html', 'w', encoding='utf-8') as f:
    f.write(html)
print('Done!')
