import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function SocialMedia(props: any) {
  if (Object.values(props).every(x => x === "" || x === undefined)) {
    return <></>;
  } else {
    return (
      <div>
        <hr className="friends" />
        <div style={{ marginTop: "15px" }}>
          <h5>Social Media</h5>
          <ul style={{ listStyleType: "none", marginLeft: "-15px" }}>
            {props.reddit && (
              <li>
                <h5>
                  <FontAwesomeIcon icon={["fab", "reddit"]} />
                  <a
                    href={"https://reddit.com/u/" + props.reddit}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ wordBreak: "break-all" }}
                  >
                    {" " + props.reddit}
                  </a>
                </h5>
              </li>
            )}
            {props.twitter && (
              <li>
                <h5>
                  <FontAwesomeIcon icon={["fab", "twitter"]} />
                  <a
                    href={"https://twitter.com/" + props.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ wordBreak: "break-all" }}
                  >
                    {" " + props.twitter}
                  </a>
                </h5>
              </li>
            )}
            {props.facebook && (
              <li>
                <h5>
                  <FontAwesomeIcon icon={["fab", "facebook"]} />
                  <a
                    href={"https://facebook.com/" + props.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ wordBreak: "break-all" }}
                  >
                    {" " + props.facebook}
                  </a>
                </h5>
              </li>
            )}
            {props.github && (
              <li>
                <h5>
                  <FontAwesomeIcon icon={["fab", "github"]} />
                  <a
                    href={"https://github.com/" + props.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ wordBreak: "break-all" }}
                  >
                    {" " + props.github}
                  </a>
                </h5>
              </li>
            )}
            {props.gitlab && (
              <li>
                <h5>
                  <FontAwesomeIcon icon={["fab", "gitlab"]} />
                  <a
                    href={"https://gitlab.com/" + props.gitlab}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ wordBreak: "break-all" }}
                  >
                    {" " + props.gitlab}
                  </a>
                </h5>
              </li>
            )}
            {props.skype && (
              <li>
                <h5>
                  <FontAwesomeIcon icon={["fab", "skype"]} />
                  <a
                    href={"skype:" + props.skype + "?userinfo"}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ wordBreak: "break-all" }}
                  >
                    {" " + props.skype}
                  </a>
                </h5>
              </li>
            )}
            {props.steam && (
              <li>
                <h5>
                  <FontAwesomeIcon icon={["fab", "steam"]} />
                  <a
                    href={"https://steamcommunity.com/id/" + props.steam}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ wordBreak: "break-all" }}
                  >
                    {" " + props.steam}
                  </a>
                </h5>
              </li>
            )}
            {props.twitch && (
              <li>
                <h5>
                  <FontAwesomeIcon icon={["fab", "twitch"]} />
                  <a
                    href={"https://twitch.tv/" + props.twitch}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ wordBreak: "break-all" }}
                  >
                    {" " + props.twitch}
                  </a>
                </h5>
              </li>
            )}
            {props.youtube && (
              <li>
                <h5>
                  <FontAwesomeIcon icon={["fab", "twitch"]} />
                  <a
                    href={"https://youtube.com/" + props.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ wordBreak: "break-all" }}
                  >
                    {" " + props.youtube}
                  </a>
                </h5>
              </li>
            )}
          </ul>
        </div>
      </div>
    );
  }
}
