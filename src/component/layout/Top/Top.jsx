import React from 'react'
import './Top.css';
import { Link } from 'react-router-dom';
import { MdNavigateNext } from "react-icons/md";
export default function Top({title}) {
  return (
    <>
     <div className="home">
		<div className="breadcrumbs_container">
			<div className="container">
				<div className="row">
					<div className="col">
						<div className="breadcrumbs">
							<ul>
								<li><Link to="/">Home</Link> <MdNavigateNext/></li>
								<li>{title}</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>			
	</div> 
    </>
  )
}
