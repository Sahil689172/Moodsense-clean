import re
from pathlib import Path

# File path
domain_path = Path("C:/Users/hp/OneDrive/Desktop/Moodsense/domain.yml")
backup_path = domain_path.with_name("domain_backup.yml")

# Backup original
domain_path.replace(backup_path)

with open(backup_path, "r", encoding="utf-8") as file:
    lines = file.readlines()

fixed_lines = []
in_multiline_text = False
buffer = []

for line in lines:
    stripped = line.strip()
    
    # Start of multiline broken "- text: " line
    if stripped.startswith('- text: "') and not stripped.endswith('"'):
        in_multiline_text = True
        buffer = [line.strip()[9:]]  # Remove - text: "
        indent = len(line) - len(line.lstrip())
        continue

    if in_multiline_text:
        # End of multiline double-quote block
        if stripped.endswith('"'):
            buffer.append(stripped[:-1])  # Remove closing "
            full_text = "\n".join(buffer)
            # Write YAML block-style
            fixed_lines.append(" " * indent + "- text: |\n")
            for line_part in full_text.split("\n"):
                fixed_lines.append(" " * (indent + 2) + line_part.strip() + "\n")
            in_multiline_text = False
        else:
            buffer.append(stripped)
    else:
        fixed_lines.append(line)

# Save cleaned file
with open(domain_path, "w", encoding="utf-8") as file:
    file.writelines(fixed_lines)

print(f"✅ All broken multi-line text blocks fixed. Backup saved to: {backup_path}") 