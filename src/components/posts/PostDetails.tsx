import DOMPurify from 'dompurify';
import { stateToHTML } from 'draft-js-export-html';

const PostDetail = () => {
    const createMarkup = (html) => {
        return {
            __html: DOMPurify.sanitize(html)
        }
    }
    let convertedContent = "";
    return (
        <div className="App">
            <div className="preview" dangerouslySetInnerHTML={createMarkup(convertedContent)}></div>
        </div>
    )
}

export default PostDetail;