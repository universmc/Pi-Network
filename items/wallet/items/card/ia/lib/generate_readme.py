# generate_readme.py

import os
import subprocess

def get_git_version():
    try:
        version = subprocess.check_output(['git', 'describe', '--tags'], stderr=subprocess.STDOUT, text=True).strip()
        return f"Version: {version}"
    except subprocess.CalledProcessError:
        return "Version: N/A"

def get_git_issues():
    try:
        issues = subprocess.check_output(['git', 'log', '--oneline', '--no-merges'], stderr=subprocess.STDOUT, text=True)
        return f"Issues:\n{issues}"
    except subprocess.CalledProcessError:
        return "Issues: N/A"

def get_brainstorming_summary():
    # You can customize this function to read summaries from your brainstorming sessions
    return "Brainstorming Summary: ..."

def generate_readme():
    version = get_git_version()
    issues = get_git_issues()
    brainstorming_summary = get_brainstorming_summary()

    readme_content = f"""# Project Name

{version}

## Issues
{issues}

## Brainstorming Summary
{brainstorming_summary}
"""

    with open("README.md", "w") as readme_file:
        readme_file.write(readme_content)

if __name__ == "__main__":
    generate_readme()

