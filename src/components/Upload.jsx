import React, { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { FaPlus } from "react-icons/fa";
import { tags } from "../Constants";

const Upload = ({ file, setFile, setAllow, allow }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [tagged, setTagged] = useState([]);
  const [active, setActive] = useState(false);

  const newTags = tags.filter((tag) =>
    tag.name.toLowerCase().includes(searchTerm)
  );

  const handleChangeTag = (tag) => {
    const newTag = tagged.find((t) => t.id === tag.id);
    if (newTag) {
      return toast.error("tag already exists");
    } else {
      setTagged([...tagged, tag]);
      setSearchTerm("");
    }
  };

  const handleDeleteTag = (tag) => {
    const newTagged = tagged.filter((t) => t.id !== tag.id);
    setTagged(newTagged);
  };

  useEffect(() => {
    if (searchTerm.length > 2) {
      return setActive(true);
    } else {
      return setActive(false);
    }
  }, [searchTerm]);

  return (
    <div className="file__uploadContainer">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="uploader__header">
        <p onClick={() => setFile(null)}>Back</p>
        <button>Publish</button>
      </div>

      <div className="uploader__container">
        <div className="left__uploader">
          <img src={file} alt="" />
        </div>
        <div className="right__uploader">
          <p>Add the basics</p>

          <form>
            <div className="input__container">
              <label>Idea poster title</label>
              <input type="text" placeholder="Add title" />
            </div>
            <div className="input__container">
              <label>Description</label>
              <textarea placeholder="Add a description" />
            </div>
            <div className="input__container">
              <label>Tagged topics ({})</label>
              <input
                type="text"
                placeholder="Search tags"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="tags__container">
                {tagged.map((t) => (
                  <p key={t.id}>
                    {t.name} <FaPlus onClick={() => handleDeleteTag(t)} />
                  </p>
                ))}
              </div>

              <span>Don't worry, people won't see your tags.</span>
              {active && (
                <ul className="search__container">
                  {newTags.map((t) => (
                    <li key={t.id} onClick={() => handleChangeTag(t)}>
                      {t.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="Comment__option">
              <div
                className={`ball__slider ${allow && "active"}`}
                onClick={() => setAllow(!allow)}
              >
                <div className={`ball ${allow && "active"}`}></div>
              </div>
              <span>Allow people to comment</span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Upload;
