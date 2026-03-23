import os
import shutil
import yaml
import subprocess

# Configuration
SOURCE_ROOT = "/Users/liam/trae_projects/ui/manta_web/temp_pm_skills/skills"
OUTPUT_ROOT = "/Users/liam/trae_projects/ui/manta_web/pm-skills-output"
PACKAGE_SCRIPT = "/Users/liam/.trae/skills/skill-creator/scripts/package_skill.py"

# List of skills to install (prioritized subset)
SELECTED_SKILLS = [
    "prd-development",
    "user-story",
    "discovery-process",
    "roadmap-planning",
    "product-strategy-session",
    "prioritization-advisor",
    "opportunity-solution-tree",
    "jobs-to-be-done",
    "tam-sam-som-calculator",
    "press-release"
]

def sanitize_frontmatter(src_path, dest_path):
    with open(src_path, 'r') as f:
        content = f.read()
    
    # Split frontmatter
    if content.startswith('---'):
        parts = content.split('---', 2)
        if len(parts) >= 3:
            fm_text = parts[1]
            body = parts[2]
            
            try:
                fm = yaml.safe_load(fm_text)
                new_fm = {
                    'name': fm.get('name'),
                    'description': fm.get('description')
                }
                
                with open(dest_path, 'w') as f:
                    f.write('---\n')
                    yaml.dump(new_fm, f, default_flow_style=False)
                    f.write('---\n')
                    f.write(body)
                return True
            except Exception as e:
                print(f"Error parsing YAML for {src_path}: {e}")
                return False
    
    # Fallback copy if no valid frontmatter
    shutil.copy2(src_path, dest_path)
    return True

def process_skill(skill_name):
    src_dir = os.path.join(SOURCE_ROOT, skill_name)
    dest_dir = os.path.join(OUTPUT_ROOT, skill_name)
    
    if not os.path.exists(src_dir):
        print(f"Skill not found: {skill_name}")
        return

    print(f"Processing {skill_name}...")
    
    # Create directories
    os.makedirs(dest_dir, exist_ok=True)
    os.makedirs(os.path.join(dest_dir, "references"), exist_ok=True)
    os.makedirs(os.path.join(dest_dir, "assets"), exist_ok=True)
    os.makedirs(os.path.join(dest_dir, "scripts"), exist_ok=True)

    # 1. Handle SKILL.md
    if os.path.exists(os.path.join(src_dir, "SKILL.md")):
        sanitize_frontmatter(os.path.join(src_dir, "SKILL.md"), os.path.join(dest_dir, "SKILL.md"))
    
    # 2. Handle examples -> references
    if os.path.exists(os.path.join(src_dir, "examples")):
        for item in os.listdir(os.path.join(src_dir, "examples")):
            s = os.path.join(src_dir, "examples", item)
            d = os.path.join(dest_dir, "references", item)
            if os.path.isfile(s):
                shutil.copy2(s, d)
    
    # 3. Handle template.md -> assets
    if os.path.exists(os.path.join(src_dir, "template.md")):
        shutil.copy2(os.path.join(src_dir, "template.md"), os.path.join(dest_dir, "assets", "template.md"))

    # 4. Handle scripts -> scripts
    if os.path.exists(os.path.join(src_dir, "scripts")):
        for item in os.listdir(os.path.join(src_dir, "scripts")):
            s = os.path.join(src_dir, "scripts", item)
            d = os.path.join(dest_dir, "scripts", item)
            if os.path.isfile(s):
                shutil.copy2(s, d)

    # 5. Package
    try:
        subprocess.run(["python3", PACKAGE_SCRIPT, dest_dir], check=True)
        print(f"Successfully packaged {skill_name}")
    except subprocess.CalledProcessError as e:
        print(f"Failed to package {skill_name}: {e}")

def main():
    if os.path.exists(OUTPUT_ROOT):
        shutil.rmtree(OUTPUT_ROOT)
    os.makedirs(OUTPUT_ROOT)

    for skill in SELECTED_SKILLS:
        process_skill(skill)

if __name__ == "__main__":
    main()
