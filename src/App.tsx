import { useState } from 'react'
import SDK from './Sdk'

function App() {
    const [url, setUrl] = useState('');
    const [qualities, setQualities] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showError, setShowError] = useState(false);
    const [id, setID] = useState('');

    const onFetchClick = async () => {
        setIsLoading(() => true);
        setShowError(() => false);
        setQualities([]);

        try {
            let id = new URL(url).searchParams.get('viewkey');

            if (id) {
                setID(id);
                setQualities(await SDK.getInfo(id));
            }
            else {
                setShowError(() => true);
            }
        }
        catch (e) {
            setShowError(() => true);
        }

        setIsLoading(() => false);
    }

    const onDownloadClick = async (quality: string) => {
        SDK.getVideo(id, quality);
    }

    return (
        <div className="container">
            <h1>PH Fetcher</h1>
            <input type="text" className="form-control" placeholder="Enter URL" onChange={(e) => setUrl(e.currentTarget.value)} disabled={isLoading} />
            {showError && <div className="alert alert-danger mt-3">Error fetching data</div>}
            <button className="btn btn-primary mt-3" disabled={isLoading} onClick={onFetchClick}>{isLoading ? "..." : "Fetch"}</button>

            {
                qualities.length > 0 && (
                    <div className="mt-3">
                        <h3>Qualities</h3>
                        {
                            qualities.map((q, i) => (
                                <button className="btn btn-primary me-2" key={i} onClick={() => onDownloadClick(q)}>{q}p</button>
                            ))
                        }
                    </div>
                )
            }
        </div>
    )
}

export default App
