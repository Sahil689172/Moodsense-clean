import yaml
import re
from pathlib import Path

# Paths
domain_path = Path("domain.yml")
stories_path = Path("data/stories.yml")
rules_path = Path("data/rules.yml")

# Load domain
with open(domain_path, "r", encoding="utf-8") as f:
    domain = yaml.safe_load(f)

if "responses" not in domain:
    domain["responses"] = {}

# Function to extract utter actions from story/rule files
def extract_utterances(filepath):
    utterances = set()
    if not filepath.exists():
        return utterances
    with open(filepath, "r", encoding="utf-8") as file:
        for line in file:
            match = re.search(r'- (utter_[a-zA-Z0-9_]+)', line)
            if match:
                utterances.add(match.group(1))
    return utterances

# Extract all utter_ actions used
all_utterances = extract_utterances(stories_path).union(extract_utterances(rules_path))

# Add missing ones with placeholder text
added = 0
for utter in all_utterances:
    if utter not in domain["responses"]:
        domain["responses"][utter] = [{"text": f"[Placeholder] Response for {utter.replace('utter_', '').replace('_', ' ').capitalize()}."}]
        added += 1

# Save updated domain.yml
with open(domain_path, "w", encoding="utf-8") as f:
    yaml.dump(domain, f, sort_keys=False, allow_unicode=True)

print(f"✅ Added {added} missing utterances. Domain updated successfully.") 