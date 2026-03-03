from markitdown import MarkItDown
md = MarkItDown()
result = md.convert("/Users/liam/trae_projects/ui/manta_web/Doc/Manta VPP Product introduction.pptx")
print(result.text_content)
