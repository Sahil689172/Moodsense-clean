from pathlib import Path

domain_file = Path("C:/Users/hp/OneDrive/Desktop/Moodsense/domain.yml")

fixed_lines = []
with open(domain_file, "r", encoding="utf-8") as f:
    for line in f:
        if line.strip().startswith("- text: '") and "'" in line[9:]:
            # Replace outer single quotes with double quotes
            content = line.strip()[8:]  # after "- text: "
            fixed_line = '- text: ' + '"' + content[1:-1].replace('"', '\\"') + '"\n'
            fixed_lines.append(fixed_line)
        else:
            fixed_lines.append(line)

with open(domain_file, "w", encoding="utf-8") as f:
    f.writelines(fixed_lines)

print("✅ Fixed quote issues in domain.yml") 