import { ReactElement, ReactNode, useState } from "react";

interface propsString {
	len: number;
	component?: string;
}

interface propsArray {
	len: number;
	component?: any[];
	renderItem: (e: any) => ReactElement;
	RenderWrap: (props: { children: ReactNode }) => ReactElement;
}

function ReadMore(props: propsString): ReactElement;
function ReadMore(props: propsArray): ReactElement;
function ReadMore(props: propsString | propsArray): ReactElement {
	const { component, len } = props;

	const [desc, setDesc] = useState(false);
	const longDesc = component?.slice(0, len);
	const showButton = component && component.length > len;

	const Read = (
		<button
			style={{ all: "unset", width: "100%", cursor: "pointer", textDecoration: "underline" }}
			onClick={() => setDesc(!desc)}>
			{desc ? `Свернуть` : `Показать полностью`}
		</button>
	);

	if (Array.isArray(longDesc) && Array.isArray(component)) {
		const { RenderWrap, renderItem } = props as propsArray;

		return (
			<RenderWrap>
				{desc ? component.map(e => renderItem(e)) : longDesc.map(e => renderItem(e))}
				{showButton && Read}
			</RenderWrap>
		);
	}

	if (typeof component === "string") {
		return (
			<>
				{desc ? component : longDesc}
				{showButton && Read}
			</>
		);
	}

	return <></>;
}

export default ReadMore;
