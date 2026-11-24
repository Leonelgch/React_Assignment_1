const Avatar = ({ src, onChangeSrc, onMouseOver, stats }) => {

    function handleFileChange(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                onChangeSrc(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    function handleMouseOver(status) {
        onMouseOver(status);
    }

    return (
        <>
            <label>
                <img
                    src={src}
                    alt="Avatar"
                    onMouseEnter={() => handleMouseOver(true)}
                    onMouseLeave={() => handleMouseOver(false)}
                />
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                />
            </label>
            {stats.overImage ? <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                <li style={{color: "green"}}>Wins:{stats.wins}</li><li style={{color: "yellow"}}>Draws:{stats.draws}</li></ul>:null}
        </>
    );
}
export default Avatar