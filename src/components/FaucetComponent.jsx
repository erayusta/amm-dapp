import { useState } from "react";
import "../styles.css";
import BoxTemplate from "./BoxTemplate";
import { PRECISION } from "../constants";

export default function FaucetComponent(props) {
    const [amountOfKar, setAmountOfToken1] = useState(0);
    const [amountOfKothi, setAmountOfToken2] = useState(0);

    const onChangeAmountOfToken2 = (e) => {
        setAmountOfToken2(e.target.value);
    };

    const onChangeAmountOfToken1 = (e) => {
        setAmountOfToken1(e.target.value);
    };
	
    // Funds the account with given amount of Tokens 
    async function onClickFund() {
        if (props.contract === null) {
            alert("Connect to Metamask");
            return;
        }
        if (["", "."].includes(amountOfKar) || ["", "."].includes(amountOfKothi)) {
            alert("Amount should be a valid number");
            return;
        }
        try {
            let response = await props.contract.faucet(
                amountOfKar * PRECISION,
                amountOfKothi * PRECISION
            );
            let res = await response.wait();
            console.log("res", res);
            setAmountOfToken1(0);
            setAmountOfToken2(0);
            await props.getHoldings();
            alert("Success");
        } catch (err) {
            err?.data?.message && alert(err?.data?.message);
            console.log(err);
        }
    }

    return (
        <div className="tabBody">
            <BoxTemplate
                leftHeader={"Amount of TOKEN1"}
                right={"TOKEN1"}
                value={amountOfKar}
                onChange={(e) => onChangeAmountOfToken1(e)}
            />
            <BoxTemplate
                leftHeader={"Amount of TOKEN2"}
                right={"TOKEN2"}
                value={amountOfKothi}
                onChange={(e) => onChangeAmountOfToken2(e)}
            />
            <div className="bottomDiv">
                <div className="btn" onClick={() => onClickFund()}>
                    Fund
                </div>
            </div>
        </div>
    );
}
