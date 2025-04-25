import pickle
import os

# Load the embedded data
with open('/home/ubuntu/visionguard_embedded_data.pkl', 'rb') as f:
    data = pickle.load(f)

# Read the template notebook
with open('/home/ubuntu/visionguard_analysis_with_fig_template.ipynb', 'r') as f:
    notebook = f.read()

# Replace the placeholders with the actual data
notebook = notebook.replace('"INJURY_DATA_BASE64_PLACEHOLDER"', '"' + data['injury_data'] + '"')
notebook = notebook.replace('"MODEL_DATA_BASE64_PLACEHOLDER"', '"' + data['model_data'] + '"')

# Write the final notebook
with open('/home/ubuntu/visionguard_analysis_with_fig_final.ipynb', 'w') as f:
    f.write(notebook)

print('Notebook with embedded data created successfully!')
