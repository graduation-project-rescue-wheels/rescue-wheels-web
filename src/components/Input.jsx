import NearMeIcon from '@mui/icons-material/NearMe';


const Input = ({ id, name, type, onChange, onBlur, value, formT, formE, text }) => {
    return (
        <div className="mb-3">
            <label htmlFor={type} className="form-label text-capitalize">{text}</label>
            <div className="input position-relative">
                {
                    name === "location" && (
                        <div
                            className="icon"
                            style={{ position: "absolute", cursor: "pointer", right: "2%", top: "8px" }}
                        >
                            <NearMeIcon />
                        </div>

                    )
                }
                <input
                    type={type}
                    className="form-control"
                    id={id}
                    name={name}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                />
            </div>

            {formT && formE && (
                <div className="alert alert-danger mt-2">{formE}</div>
            )}
        </div>
    )
}

export default Input