//This form is for updating anything in the database.
import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import Controls from "../controls/Controls";
import { Row, Col } from "antd";

const EditForm = (props) => {
  const { data, onSubmit, options, from } = props;

  const values = Object.keys(data).filter(
    (item) =>
      item !== "_id" &&
      item !== "__v" &&
      item !== "createdAt" &&
      item !== "updatedAt" &&
      item !== "password" &&
      item !== "complaints"
  );

  const methods = useForm();
  const FormItems = (item) => {
    if (
      item === "category" ||
      item === "status" ||
      item === "type" ||
      item === "role"
    ) {
      return (
        <Controls.CustomSelect
          label={item}
          name={item}
          placeholder={`Enter ${item}`}
          rules={{ required: `${item} is required.` }}
          register={methods.register}
          errorFont={13}
          error={methods.formState.errors}
          defaultValue={data[item]}
          disabled={
            item === "category" || item === "type" || data[item] === "Resolved"
              ? true
              : false
          }
          options={
            from === "user"
              ? options
              : options?.map((item, index) => {
                  let obj = {
                    ...item,
                    disabled: index === 0 ? true : false,
                  };
                  return obj;
                })
          }
        />
      );
    } else {
      return (
        <Controls.TextField
          label={item}
          name={item}
          placeholder={`Enter ${item}`}
          rules={{ required: `${item} is required.` }}
          register={methods.register}
          errorFont={13}
          error={methods.formState.errors}
          defaultValue={data[item]}
        />
      );
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Row gutter={16}>
          {values.map((item) => {
            return (
              <Col
                xs={2}
                sm={4}
                md={6}
                lg={24}
                xl={10}
                style={{ marginBottom: 16 }}
              >
                {FormItems(item)}
              </Col>
            );
          })}
          {from === "complaint" && (
            <Col
              xs={2}
              sm={4}
              md={6}
              lg={24}
              xl={10}
              style={{ marginBottom: 16 }}
            >
              <Controls.TextField
                label="Remarks"
                name="remarks"
                placeholder="Enter remarks"
                rules={{ required: "Remarks is required." }}
                register={methods.register}
                errorFont={13}
                error={methods.formState.errors}
                defaultValue={data?.remarks}
                disabled={data?.status === "Resolved" ? true : false}
              />
            </Col>
          )}
        </Row>
        <Row gutter={16} style={{ marginTop: 16 }}>
          <Col span={8}>
            <Controls.Button
              type="submit"
              text="Update"
              style={{ marginTop: "16px" }}
            />
          </Col>
        </Row>
      </form>
    </FormProvider>
  );
};

export default EditForm;
