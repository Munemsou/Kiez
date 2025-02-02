import Avatar from "../../../public/avatar-placeholder.png";

const GroupPostCard = ({ post }) => {
  //userdaten für das ProfilBild
  const user = JSON.parse(localStorage.getItem("userData"));

  const formattedDate = new Date(post.postTime).toLocaleDateString("de-DE", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  // !Überprüfe, ob likes und comments definiert sind und setze sie auf ein leeres Array, falls nicht
  /*  const likes = post.likes || [];
  const comments = Array.isArray(post.comments) ? post.comments : []; */

  /******************************************************
   *    Profilpic
   ******************************************************/
  const profilImg = () => {
    if (user.image === undefined || null) {
      return Avatar;
    } else {
      return user.image;
    }
  };

  return (
    <div className="reusableBorder  mt-4 p-4 flex flex-col w-full">
      {/* Kopfzeile mit Profilbild, Name und Datum */}
      <div className="flex justify-between items-center mb-4">
        <aside className="flex items-center">
          <img
            src={profilImg()}
            alt="Profilbild"
            className="h-10 w-10 rounded-full"
          />
          <div className="ml-4">
            {user.firstName} {user.lastName}
          </div>
        </aside>
        <aside>{formattedDate}</aside>
      </div>

      {/* Kommentartext und optional das Bild */}
      {post.img && (
        <img
          src={post.img}
          alt="Kommentarbild"
          className="mb-4 w-full object-cover rounded-lg shadow-lg"
        />
      )}
      <p className="mb-4 text-base font-semibold text-gray-900 dark:text-gray-100">
        {post.title}
      </p>
      <p className="mb-4 text-xl text-gray-700 dark:text-gray-400">
        {post.text}
      </p>

      {/* Fußzeile mit Like- und Kommentar-Buttons */}
      <div className="flex justify-between items-center pt-4 border-t border-gray-200">
        <button type="button" className="flex items-center">
          <span className="mr-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"
              />
            </svg>
          </span>
          <span>{post.likes}</span>
        </button>
        <button type="button" className="flex items-center">
          Kommentare ({post.commentsCount})
        </button>
      </div>
    </div>
  );
};

export default GroupPostCard;
