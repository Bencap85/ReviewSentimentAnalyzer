import subprocess

# Converts jupyter notebook file "model.ipynb" to python file "model.py"
subprocess.run(['jupyter', 'nbconvert', '--to', 'script', 'models/model.ipynb'])

# Executes model.py
subprocess.run(['python', 'model.py'])