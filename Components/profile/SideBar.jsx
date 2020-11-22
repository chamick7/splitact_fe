import style from "../../css/profile.module.css";

export default function SideBar({ pageList, pageNum, setPageNum, account, toggleSideBar }) {
  const changePage = (pageId) => {
    toggleSideBar();
    setPageNum(pageId);
  };

  return (
    <div id="sideBar" className={style.sideBar + " resSideBarProfile"}>
      <div className={style.data}>
        <div className={style.profile_sideBar}>
          <img src={account.img} alt="" draggable="false" />
          <div>
            <h3>{account.username}</h3>
            <h5>{account.email}</h5>
          </div>
        </div>
        {pageList.map((page) => {
          return (
            <div
              key={page.id}
              onClick={() => {
                changePage(page.id);
              }}
              className={style.sideBar_item}
            >
              {pageNum == page.id && (
                <div className={style.key_page_index}></div>
              )}
              {page.name}
            </div>
          );
        })}
      </div>

      <div className={style.border_line}></div>
    </div>
  );
}
