import os
import glob

scripts_dir = "/Users/macair1/projects/html/scripts"
for file_path in glob.glob(os.path.join(scripts_dir, "*.py")):
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()
    
    # Replace the bad f-string logic
    bad_str = r'{' translate="no"' if lang=='en' else ''}'
    good_str = "{' translate=\"no\"' if lang=='en' else ''}"
    
    if bad_str in content:
        content = content.replace(bad_str, good_str)
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"Fixed {os.path.basename(file_path)}")

