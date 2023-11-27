import { DiscordIcon, GithubIcon, LogoIcon, TwiiterIcon } from "@/public/icons";
import { DescentClickAnimation, DescentContainer } from "..";
import classNames from "classnames";

const content = [
  {
    title: "About Us",
    links: [
      {
        title: "Terms",
        link: "#",
      },
      {
        title: "Privacy Policy",
        link: "#",
      },
      {
        title: "Community",
        link: "#",
      },
    ],
  },
  {
    title: "Resources",
    links: [
      {
        title: "Documentation",
        link: "#",
      },
      {
        title: "Blog",
        link: "#",
      },
    ],
  },
  {
    title: "Products",
    links: [
      {
        title: "Borrow",
        link: "#",
      },
      {
        title: "Earn",
        link: "#",
        isCommingSoon: true,
      },
    ],
  },
];

const DescentFooter = () => {
  return (
    <DescentContainer>
      <footer className="flex flex-col xl:flex-row gap-16 xl:gap-0 justify-between py-[72px]">
        <div>
          <LogoIcon />
          <div className="mt-3 pl-10 flex items-center gap-5">
            <DescentClickAnimation>
              <a
                href="https://github.com/Descent-Collective"
                target="_blank"
                rel="noopener noreferrer"
              >
                <GithubIcon />
              </a>
            </DescentClickAnimation>
            <DescentClickAnimation>
              <a
                href="https://twitter.com/DescentDAO"
                target="_blank"
                rel="noopener noreferrer"
              >
                <TwiiterIcon />
              </a>
            </DescentClickAnimation>
            <DescentClickAnimation>
              <a
                href="https://discord.gg/avjHYmueHf"
                target="_blank"
                rel="noopener noreferrer"
              >
                <DiscordIcon />
              </a>
            </DescentClickAnimation>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:justify-between gap-12 xl:gap-20">
          <div className="flex flex-col md:flex-row gap-12 md:gap-20">
            {content.map((item, index) => (
              <div
                key={index}
                className="md:order-1 xl:order-2 flex flex-col gap-6 text-black-100"
              >
                <h6 className="text-lg xl:text-xl font-semibold">
                  {item.title}
                </h6>
                {item.links.map((link, id) => (
                  <div key={id} className="flex items-center gap-3">
                    <a
                      href={link.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={classNames("text-sm xl:text-base", {
                        "text-grey-500": link.isCommingSoon,
                      })}
                    >
                      {link.title}
                    </a>

                    {link.isCommingSoon && (
                      <div className="bg-green-300 py-2 px-[10px] rounded-2xl text-xs text-grey-500">
                        Coming to mainnet
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-6 text-black-100">
            <h6 className="text-lg xl:text-xl font-semibold">
              Stay up to date with Descent
            </h6>
            <div className="text-sm xl:text-base">
              Subscribe to the newsletter for Descent updates
            </div>
            <div className="flex items-center justify-between rounded-[32px] pl-5 pr-2 h-14 border border-grey-650 md:w-[370px] xl:w-auto">
              <input
                className="w-full h-full bg-transparent outline-none text-sm md:text-base text-grey-650"
                placeholder="Enter email address here"
              />
              <DescentClickAnimation>
                <button
                  type="button"
                  className="h-11 rounded-[20px] flex items-center justify-center gap-1 px-3 bg-black-100"
                >
                  <div className="text-xs md:text-sm font-medium text-white-50">
                    Subscribe
                  </div>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="17"
                    viewBox="0 0 16 17"
                    fill="none"
                  >
                    <path
                      d="M13.1641 8.31641L3.16406 8.31641"
                      stroke="white"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M9.13281 4.30034L13.1661 8.31634L9.13281 12.333"
                      stroke="white"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </button>
              </DescentClickAnimation>
            </div>
          </div>
        </div>
      </footer>
    </DescentContainer>
  );
};

export default DescentFooter;
