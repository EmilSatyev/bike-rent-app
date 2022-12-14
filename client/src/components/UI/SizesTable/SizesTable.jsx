import React from "react";
import styles from "./SizesTable.module.scss";
import SimpleBar from "simplebar-react";

const SizesTable = () => {
  return (
    <SimpleBar style={{ maxHeight: "1000px", marginBottom: "30px" }}>
      <div className={styles.root}>
        <table className={styles.root__table}>
          <tbody>
            <tr>
              <th>Размер</th>
              <td>XS</td>
              <td>S</td>
              <td>M</td>
              <td>L</td>
              <td>XL</td>
              <td>XXL</td>
            </tr>
            <tr>
              <th>Высота (см)</th>
              <td>130-155</td>
              <td>145-165</td>
              <td>156-177</td>
              <td>172-185</td>
              <td>180-195</td>
              <td>190-210</td>
            </tr>
          </tbody>
        </table>
      </div>
    </SimpleBar>
  );
};

export default SizesTable;
