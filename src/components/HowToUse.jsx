import { TbCircleNumber1 } from "react-icons/tb";
import { TbCircleNumber2 } from "react-icons/tb";
import { TbCircleNumber3 } from "react-icons/tb";

function HowToUse() {
    return (
        <section id="howtouse">
            <div className="cards">
                <div className="card">
                    <TbCircleNumber1 size={50} />
                    <h3>Step 1</h3>
                    <p>Add text to create a new Paste.</p>
                </div>
                <div className="card">
                    <TbCircleNumber2 size={50} />
                    <h3>Step 2</h3>
                    <p>View or Copy the paste link.</p>
                </div>
                <div className="card">
                    <TbCircleNumber3 size={50} />
                    <h3>Step 3</h3>
                    <p>Share the link with your friends!</p>
                </div>
            </div>
        </section>
    )
}

export default HowToUse