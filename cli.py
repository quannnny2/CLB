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


@app.command()
def copy_sluggerpics_assets():
    """
    Copy headshots/sideview images from data/sluggerpics to website/public/images/players,
    and logos to website/public/images/teams/logos.
    """
    import shutil

    src_base = Path("data/sluggerpics")
    dst_players = Path("website/public/images/players")
    dst_logos = Path("website/public/images/teams/logos")

    src_headshots = src_base / "headshots"
    src_sideview = src_base / "sideview"
    if not src_headshots.exists():
        print(f"Source directory {src_headshots} does not exist.")
        raise typer.Exit(1)
    if not src_sideview.exists():
        print(f"Source directory {src_sideview} does not exist.")
        raise typer.Exit(1)
    dst_players.mkdir(parents=True, exist_ok=True)

    for img in src_headshots.glob("*"):
        if img.is_file():
            shutil.copy2(img, dst_players / img.name)
    print(f"Copied headshots to {dst_players}")

    for img in src_sideview.glob("*"):
        if img.is_file():
            shutil.copy2(img, dst_players / img.name)
    print(f"Copied sideview images to {dst_players}")

    src_logos = src_base / "logos"
    if not src_logos.exists():
        print(f"Source directory {src_logos} does not exist.")
        raise typer.Exit(1)
    dst_logos.mkdir(parents=True, exist_ok=True)
    for img in src_logos.glob("*"):
        if img.is_file():
            shutil.copy2(img, dst_logos / img.name)
    print(f"Copied logos to {dst_logos}")


if __name__ == "__main__":
    app()
