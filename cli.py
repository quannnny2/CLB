import httpx
import typer
import zipfile
from pathlib import Path

app = typer.Typer()


@app.command()
def download_sluggerpics():
    """Download and unzip sluggerspics archive to data/sluggerpics"""
    url = "https://github.com/joeythegoon/sluggerspics/archive/refs/heads/main.zip"
    data_dir = Path("data")
    extract_dir = data_dir / "sluggerpics"
    zip_path = data_dir / "sluggerspics-main.zip"

    data_dir.mkdir(exist_ok=True)

    print(f"Downloading {url}...")
    with httpx.stream("GET", url, follow_redirects=True) as response:
        response.raise_for_status()
        with open(zip_path, "wb") as f:
            for chunk in response.iter_bytes():
                f.write(chunk)

    print(f"Extracting to {extract_dir}...")
    with zipfile.ZipFile(zip_path) as zip_file:
        zip_file.extractall(data_dir)

    extracted_dir = data_dir / "sluggerspics-main"
    if extracted_dir.exists():
        if extract_dir.exists():
            import shutil

            shutil.rmtree(extract_dir)
        extracted_dir.rename(extract_dir)

    zip_path.unlink()

    print(f"Successfully downloaded and extracted to {extract_dir}")


if __name__ == "__main__":
    app()
