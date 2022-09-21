const AdminDashBoard = () => {
  return (
    <>
      <div className="container-fluid px-4">
        <h1 className="mt-4">Dashboard Page</h1>
        <ol className="breadcrumb mb-4">
          {/* <li className="breadcrumb-item active">Dashboard</li> */}
        </ol>

        <div className="row">
          <div className="col-xl-3 col-md-6">
            <div className="card bg-primary text-white mb-4">
              <div className="card-body">Primary Card</div>
              <div className="card-footer d-flex align-items-center justify-content-between">
                <a className="small text-white stretched-link" href="/">
                  View Details
                </a>
                <div className="small text-white">
                  <i className="fas fa-angle-right"></i>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-md-6">
            <div className="card bg-warning text-white mb-4">
              <div className="card-body">Warning Card</div>
              <div className="card-footer d-flex align-items-center justify-content-between">
                <a className="small text-white stretched-link" href="/">
                  View Details
                </a>
                <div className="small text-white">
                  <i className="fas fa-angle-right"></i>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-md-6">
            <div className="card bg-success text-white mb-4">
              <div className="card-body">Success Card</div>
              <div className="card-footer d-flex align-items-center justify-content-between">
                <a className="small text-white stretched-link" href="/">
                  View Details
                </a>
                <div className="small text-white">
                  <i className="fas fa-angle-right"></i>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-md-6">
            <div className="card bg-danger text-white mb-4">
              <div className="card-body">Danger Card</div>
              <div className="card-footer d-flex align-items-center justify-content-between">
                <a className="small text-white stretched-link" href="/">
                  View Details
                </a>
                <div className="small text-white">
                  <i className="fas fa-angle-right"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card mb-4">
          <div className="card-body">
            <p className="mb-0">
              This page is an example of using static navigation. By removing the
              <code>.sb-nav-fixed</code>
              className from the
              <code>body</code>, the top navigation and side navigation will become static on
              scroll. Scroll down this page to see an example.
            </p>
          </div>
        </div>

        <div className="card mb-4">
          <div className="card-body">
            When scrolling, the navigation stays at the top of the page. This is the end of the
            static navigation demo.
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashBoard;
