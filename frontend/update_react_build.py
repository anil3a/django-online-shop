import os
import json
import shutil
# import logging

# Configure logging
# logging.basicConfig(filename='update_templates.log', level=logging.DEBUG)

# Path to the manifest file generated during the build process
MANIFEST_PATH = 'build/asset-manifest.json'

# Path to the Django template directory
STATIC_DIR = '../app/static/reactjs/'

# Mapping of original filenames to static filenames
STATIC_FILENAMES = {
    'main.css': 'styles.css',
    'main.js': 'bundle.js',
    'main.01323e39.js.map': 'bundle.js.map'
}


def copy_static_files():
    # Load the manifest file
    with open(MANIFEST_PATH, 'r') as f:
        manifest = json.load(f)

    if not manifest.get('files'):
        # logging.info('Manifest layout error, expected files as a first dict')
        return False

    # Copy each file to the Django static directory
    for original_filename, static_filename in STATIC_FILENAMES.items():
        hashed_filename = manifest['files'].get(original_filename)
        if hashed_filename:
            # os.path.join('build', hashed_filename)
            src_path = './build' + hashed_filename
            dest_path = os.path.join(STATIC_DIR, static_filename)
            shutil.copyfile(src_path, dest_path)

    # logging.info(f'Script ended')


if __name__ == '__main__':
    copy_static_files()
