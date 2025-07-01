import Tag from "@/pages/Users/widgets/Filters/components/Tags/Tag";
import useUpdateParams from "@/shared/hooks/useChangeParams";
import StoreForm from "@/shared/stores/Store-Form";
// import StoreTags from "@/shared/stores/Store-Tags";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Chip from "@mui/material/Chip";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import {observer} from "mobx-react-lite";
import {useRef} from "react";

function Tags() {
	const [params, updateParams] = useUpdateParams();

	// useEffect(() => {
	// 	if (!StoreForm.form?.tags?.map(e => e.tag).includes(tag)) {
	// 		updateParams("tags", tag, false, true, true);
	// 	}
	// }, []);

	// const userTags = StoreTags.tags?.map(
	//   e => <Tag key={e} tag={e} />
	// )

	// const handleClick = () => userTags!.push(<ol><input type="checkbox" id={tagRef.current?.value} /><label htmlFor={tagRef.current?.value}>{tagRef.current?.value}</label></ol>)

	const paramsTags = params.tags ? params.tags.split(',').map(e => e.trim()) : []
	const formTags = [...paramsTags, ...StoreForm.form?.tags?.map(e => e.tag) ?? []]
	// console.log("LOG CLEAN", paramsTags, formTags)

	const tagsRef = useRef<string[]>(Array.from(new Set(formTags)))
	const tagRef = useRef<HTMLInputElement | null>(null);

	const handleClick = () => {
		if (!tagsRef.current?.includes(tagRef.current!.value)) {
			tagsRef.current.unshift(tagRef.current!.value!)
			updateParams('tags', tagRef.current!.value, false, true)
			if (tagRef.current) tagRef.current.value = ""
		}
  }

	// console.log("STORE TAGS", StoreTags.tags);
  console.log("PARMS TAGS", params.tags)
	console.log("BUTTON VALUE", tagRef.current?.value)

	return <FormControl fullWidth>
		<InputLabel id="tags-label">Тэги</InputLabel>
    <Select
			multiple
			value={params.tags?.split(',').map(e => e.trim()) || []}
			renderValue={selected => (
				<Box sx={{display: "flex", flexWrap: "wrap", gap: 0.5}}>
					{(selected as string[]).map(tag => {
						return <Chip key={tag} label={tag} />;
					})}
				</Box>
			)}>
			{tagsRef.current.map(tag => (
				<MenuItem key={tag} value={tag} onClick={() => {updateParams('tags', tag, false, true)}}>
					<ListItemText primary={tag} />
				</MenuItem>
			))}
		</Select>

    <TextField label="Напишите тэг" inputRef={tagRef} />
		<Button onClick={handleClick} variant="contained">Добавить</Button>
  </FormControl>
}

export default observer(Tags);

// return <>
//   {userTags}
//   <input ref={tagRef} type="text" />
//   <button onClick={handleClick}>Добавить</button>
// </>
