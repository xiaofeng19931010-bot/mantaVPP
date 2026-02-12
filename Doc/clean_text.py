import re

input_path = "/Users/liam/trae_projects/ui/manta_web/Doc/extracted_text.txt"
output_path = "/Users/liam/trae_projects/ui/manta_web/Doc/cleaned_text.txt"

header_pattern = r"National Electricity Amendment \(Integrating price-responsive resources into the NEM\) Rule 2024 No\.\s*24"
page_num_pattern = r"^\s*\d+\s*$"

with open(input_path, "r", encoding="utf-8") as f:
    lines = f.readlines()

cleaned_lines = []
for line in lines:
    # Remove the line number prefix (e.g., "1→")
    line = re.sub(r"^\s*\d+→", "", line)
    
    # Skip header lines and page numbers
    if re.search(header_pattern, line):
        continue
    if re.match(page_num_pattern, line.strip()):
        continue
        
    cleaned_lines.append(line)

with open(output_path, "w", encoding="utf-8") as f:
    f.writelines(cleaned_lines)

print("Cleaning complete.")
