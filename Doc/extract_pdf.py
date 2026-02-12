import pdfplumber

pdf_path = "/Users/liam/trae_projects/ui/manta_web/Doc/final amending rule.pdf"
output_path = "/Users/liam/trae_projects/ui/manta_web/Doc/extracted_text.txt"

try:
    with pdfplumber.open(pdf_path) as pdf:
        with open(output_path, "w", encoding="utf-8") as f:
            for page in pdf.pages:
                text = page.extract_text()
                if text:
                    f.write(text)
                    f.write("\n\n")
    print("Extraction complete.")
except Exception as e:
    print(f"Error: {e}")
