import React from 'react';
import { Link } from '@reach/router';

const footer= () => (
  <footer className="footer-light">
            <div className="container">
                <div className="row">
                    <div className="col-md-3 col-sm-6 col-xs-1">
                    </div>
                    <div className="col-md-3 col-sm-6 col-xs-1">
                        
                    </div>
                    <div className="col-md-3 col-sm-6 col-xs-1">
                        
                    </div>
                    <div className="col-md-3 col-sm-6 col-xs-1">

                    </div>
                </div>
            </div>
            <div className="subfooter">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="de-flex">
                                <div className="de-flex-col">
                                    <span onClick={()=> window.open("", "_self")}>
                                        <span className="copy">&copy; Copyright 2022 - Rainbow Warriors by Ben Karst</span>
                                    </span>
                                </div>
                                <div className="de-flex-col">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
);
export default footer;