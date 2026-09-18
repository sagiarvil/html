import os
import glob
import re

scripts_dir = "/Users/macair1/projects/html/scripts"
for file_path in glob.glob(os.path.join(scripts_dir, "*.py")):
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()
    
    modified = False
    
    # Replace <html lang="en" translate="no"> with <html lang="en" translate="no">
    if '<html lang="en" translate="no">' in content:
        content = content.replace('<html lang="en" translate="no">', '<html lang="en" translate="no">')
        modified = True

    # If it uses dynamic f-strings like <html lang="{lang}">
    # we can't just inject translate="no" easily for EN only inside the f-string without logic.
    # We can change `<html lang="{lang}">` to `<html lang="{lang}"{translate_attr}>`
    # Let's check for <html lang="{lang}">
    
    if '<html lang="{lang}">' in content:
        # We can just change the logic inside the script. Let's do it manually if needed, or by regex
        # A simpler way is to replace `<html lang="{lang}"{' translate="no"' if lang=='en' else ''}><head>` with 
        # `<html lang="{lang}"{" translate=\"no\"" if lang=="en" else ""}><head>`
        # BUT Python f-strings evaluate `{" translate=\"no\"" if lang=="en" else ""}` nicely!
        content = content.replace(
            '<html lang="{lang}"{' translate="no"' if lang=='en' else ''}><head>',
            '<html lang="{lang}"{" translate=\\"no\\"" if lang==\\"en\\" else ""}><head>'
        )
        content = content.replace(
            '<html lang="{lang}"{' translate="no"' if lang=='en' else ''}>{head',
            '<html lang="{lang}"{" translate=\\"no\\"" if lang==\\"en\\" else ""}>{head'
        )
        modified = True

    # Add <meta name="google" content="notranslate"> for EN
    # We will do this by modifying the `head` block or template.
    
    if modified:
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"Fixed translation bug in {os.path.basename(file_path)}")

