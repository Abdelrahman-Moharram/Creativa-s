ALLOWED_EXTENSIONS = ['xlxs', 'csv']

def IsAllowedFile(fileName):
    ext = fileName.split(".")[-1]
    if ext in ALLOWED_EXTENSIONS:
        return ext
    return None
