import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const Forms = () => {
	const [FormSent, changeFormSent] = useState(false);
	return (
		<>

			<Formik
				initialValues={{
					name: '',
					email: ''
				}}
				validate={(values) => {
					let errores = {};

					// Name validation
					if (!values.name) {
						errores.name = 'Please enter a name'
					} else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(values.name)) {
						errores.name = 'The name can only contain letters and spaces'
					}

					// Email validation
					if (!values.email) {
						values.email = 'Please enter an email'
					} else if (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(values.email)) {
						errores.email = 'The email can only contain letters, numbers, periods, hyphens and underscores.'
					}

					return errores;
				}}
				onSubmit={(values, { resetForm }) => {
					resetForm();
					console.log('Form sent');
					changeFormSent(true);
					setTimeout(() => changeFormSent(false), 5000);
				}}
			>
				{({ errors }) => (
					<Form className={"form"}>
						<h4 className={"text-center p-15"}>Forms with React and Formik</h4>
						<div>
							<label htmlFor="name">Nombre</label>
							<Field
								type="text"
								id="name"
								name="name"
								placeholder="your name"
							/>
							<ErrorMessage name="name" component={() => (<div className={"error"}>{errors.name}</div>)} />
						</div>
						<div>
							<label htmlFor="email">Email</label>
							<Field
								type="text"
								id="email"
								name="email"
								placeholder="email@email.com"
							/>
							<ErrorMessage name="email" component={() => (<div className={"error"}>{errors.email}</div>)} />
						</div>

						<button type="submit">Send</button>
						{FormSent && <p className={"success"}>Form sent successfully!</p>}
					</Form>
				)}
			</Formik>
		</>
	);
}

export default Forms;