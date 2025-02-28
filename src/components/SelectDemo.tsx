import * as React from "react";
import { Select } from "radix-ui";
import classnames from "classnames";
import {
	CheckIcon,
	ChevronDownIcon,
	ChevronUpIcon,
} from "@radix-ui/react-icons";
import "./SelectDemo.scss";
import { useEffect, useState } from "react";
import { s } from "node_modules/vite/dist/node/types.d-aGj9QkWt";

const SelectDemo = ({ handleChangeForSelectDemo, selectLabel, selectItemList }) => {
	// const [selectedValue, setSelectedValue] = useState(selectLabel);

	useEffect(() => {
		console.log(selectLabel);
		// setSelectedValue(selectLabel);
	}, [selectLabel])

	const handleValueChange = (e) => {
		// console.log(e);
		handleChangeForSelectDemo(e);
	}

	return (
		<Select.Root onValueChange={e => handleValueChange(e)}>
			<Select.Trigger className="SelectTrigger" aria-label="Food">
				<Select.Value placeholder={selectLabel} />
				<Select.Icon className="SelectIcon">
					<ChevronDownIcon />
				</Select.Icon>
			</Select.Trigger>
			<Select.Portal>
				<Select.Content className="SelectContent">
					<Select.ScrollUpButton className="SelectScrollButton">
						<ChevronUpIcon />
					</Select.ScrollUpButton>
					<Select.Viewport className="SelectViewport">
						<Select.Group>
							<Select.Label className="SelectLabel">{selectLabel}</Select.Label>
							{selectItemList.map((item) => {
								return (
									<SelectItem value={item}>{item}</SelectItem>
								);
							})}
						</Select.Group>
						<Select.Separator className="SelectSeparator" />

					</Select.Viewport>
					<Select.ScrollDownButton className="SelectScrollButton">
						<ChevronDownIcon />
					</Select.ScrollDownButton>
				</Select.Content>
			</Select.Portal>
		</Select.Root>
	);
};

const SelectItem = React.forwardRef(
	({ children, className, ...props }, forwardedRef) => {
		return (
			<Select.Item
				className={classnames("SelectItem", className)}
				{...props}
				ref={forwardedRef}
			>
				<Select.ItemText>{children}</Select.ItemText>
				<Select.ItemIndicator className="SelectItemIndicator">
					<CheckIcon />
				</Select.ItemIndicator>
			</Select.Item>
		);
	},
);

export default SelectDemo;
