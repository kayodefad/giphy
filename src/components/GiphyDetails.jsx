import { useLocation } from "react-router-dom";
import { formatRelative, subDays } from "date-fns";

const GiphyDetails = () => {
  const location = useLocation();
  const data = location.state?.data;

  return (
    <div className="p-7 w-[300px] max-w-full">
      {data && (
        <div>
          <img
            className="w-[300px] contain"
            src={data.images.original.url}
            alt={data.title}
          />
          <ul className=" border border-slate-400 p-2">
            <li>
              <span className="font-semibold">Title:</span> {data.title}
            </li>
            <li>
              <span className="font-semibold">Author:</span>{" "}
              {data.user.display_name}
            </li>
            <li>
              <span className="font-semibold">Date:</span>{" "}
              {formatRelative(
                subDays(new Date(data.import_datetime), 3),
                new Date()
              )}
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default GiphyDetails;
